import React, { useState, useEffect } from "react";
import GridExample from "../components/grid/Grid.component";
import Navbar from "../components/header/Header.component";
import webSocketService from "../api/WebSocketService";

const HomePage = () => {
    const [allServices, setAllServices] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Set up the WebSocket message handler for initial data
        webSocketService.setMessageHandler((services) => {
            const serviceArray = Object.values(services);
            setAllServices(serviceArray);
            setFilteredData(serviceArray);
        });

        // Set up the WebSocket message handler for service updates
        webSocketService.setServiceUpdateHandler((serviceDetail) => {
            setAllServices((prevServices) => {
                const updatedServices = prevServices.map(service => 
                    service.id === serviceDetail.id ? serviceDetail : service
                );
                return updatedServices;
            });
            setFilteredData((prevServices) => {
                const updatedServices = prevServices.map(service => 
                    service.id === serviceDetail.id ? serviceDetail : service
                );
                return updatedServices;
            });
        });

        // Send initial request to get all services
        webSocketService.sendMessage('/app/get-query-response', { message: 'Requesting all services' });

        return () => {
            webSocketService.disconnect();
        };
    }, []);

    return (
        <div className="home-page">
            <Navbar />
            <GridExample rowData={filteredData} />
        </div>
    );
};

export default HomePage;
