# IoT Web Application
### A web application for managing IoT devices.

The goal of this project is to create a user intarface that allows users to manage their IoT devices.

This project is part of IoT System. Other components in the system:
- RESTful web service - [IoT-RESTful-Webservice](https://github.com/michalkoziara/IoT-RESTful-Webservice)
- A mobile application - [IoT-mobile](https://github.com/michalkoziara/IoT-mobile)

## Getting Started

These instructions will get you a copy of the project up and running on 
your local machine for development and testing purposes.

### Prerequisites

* Node.js [15.5.0 or above] - https://nodejs.org/
* npm [7.3.0 or above] - https://www.npmjs.com/

Detailed information about installation and configurations are provided at developers' site.

## Technology Stack

* Angular [8.2.9+]
* TypeScript
* SCSS
* Chart.js

### Build 

A step by step instruction [on Windows 10]:
* Navigate to project directory in Command Prompt (cmd).
* Run `ng serve` to start application's local development server. 
* Navigate to `http://localhost:4200/` in your browser. 

The application will automatically reload if you change any of the source files.

The continous integration process is managed by Jenkins.

The default provider for the production environment is set to Heroku.

In order to distribute the application in a cloud environment, ``Jenkinsfile`` should be modified accordingly.

## Preview

<table>
    <tr>
        <td>
            <p>Hub Devices</p>
            <img src="images/img_1.png" alt="hubs" title="Hub Devices">
        </td>
        <td>
            <p>Adding Hub</p>
            <img src="images/img_2.png" alt="adding hub" title="Adding Hub">
        </td>
    </tr>
    <tr>
        <td>
            <p>User Groups</p>
            <img src="images/img_3.png" alt="user groups" title="User Groups">
        </td>
        <td>
            <p>Devices</p>
            <img src="images/img_5.png" alt="devices" title="Devices">
        </td>
    </tr>
    <tr>
        <td>
            <p>Sensors</p>
            <img src="images/img_6.png" alt="sensors" title="Sensors">
        </td>
        <td>
            <p>Administration Panel</p>
            <p>Adding Device Type</p>
            <img src="images/img_7.png" alt="adding device type" title="Adding Device Type">
        </td>
    </tr>
    <tr>
        <td>
            <p>Sensor Statistics</p>
            <img src="images/img_8.png" alt="sensor statistics" title="Sensor Statistics">
        </td>
        <td>
            <p>Sensor Measurement Chart</p>
            <img src="images/img_9.png" alt="sensor measurement chart" title="Sensor Measurement Chart">
        </td>
    </tr>
    <tr>
        <td>
            <p>Creating Automatic Rules</p>
            <img src="images/img_10.png" alt="creating automatic rules" title="Creating Automatic Rules">
        </td>
        <td>
            <p>Automatic Rule with Boolean Algebra</p>
            <img src="images/img_11.png" alt="automatic rule with boolean algebra" title="Automatic Rule with Boolean Algebra">
        </td>
    </tr>
    <tr>
        <td>
            <p>Automatic Rule with Natural Language</p>
            <img src="images/img_12.png" alt="automatic rule with natural language" title="Automatic Rule with Natural Language">
        </td>
        <td>
            <p>Device Statistics</p>
            <img src="images/img_13.png" alt="device statistics" title="Device Statistics">
        </td>
    </tr>
</table>


## Authors

* **Michał Koziara** 
* **Piotr Kramek**
