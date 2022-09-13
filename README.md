# ARGOS
<p align="center">Sistema de detección en tiempo real de personas con o sin casco</p>
<div align="center">
  <img src="https://github.com/alpalasaul/argos-client/blob/master/src/assets/home-args.png" />
</div>

## Contenido
* [Objetivo del proyecto](#objetivo-del-proyecto)
* [Demo de la app](#demo)
* [Backend](#backend)
* [Recursos](#recursos)
* [Ejecutar la aplicación cliente](#ejecutar-la-aplicación-cliente)
* [Colaboradores](#colaboradores)

Interfaz para la interacción con el modelo de machine learning


## Objetivo del proyecto
Usar algoritmos de machine learning e inteligencia artificial para desarrollar un sistema que detecte las personas con y sin casco en tiempo real con el fin de resolver la problemática de que los motociclistas no usan casco por incomodidad, obreros, entre otros casos dónde se usa casco como norma de seguridad. Este problema está presente en muchas partes del mundo como Colombia, Ecuador (Región Costa), Taiwan, etc.

## Demo
El servicio estará levantado por un par de semanas, luego se bajará la instancia en dónde se encuentra alojada por el tema de mantenimiento.

Vista nuestra aplicación: [Argos](http://app.westus3.cloudapp.azure.com)

Credenciales:
```javascript
{
  username: 'alpalasaul',
  password: 'admin12345'
}
```
## Backend
El backend que contiene el modelo de machine learning con un servicio REST que permite la comunicación con la aplicación cliente.

Visita nuestro backend: [Argos Backend](https://github.com/erickdp/argos-backend)
## Recursos
### Tecnologías usadas
* Java 11
* Maven
* JWT
* JavaScript
* Docker
* Nginx
* Amazon S3
* CDN Cloudfront
* VPN
* YOLOv7
* Python
* PostgreSQL
### Máquinas Virtuales
* Linode
* Azure
### Protocolo de comunicación
* RTSP
* RTM
* HLS
* REST
## Ejecutar la aplicación cliente
```sh
npm install
npm run dev
```
## Colaboradores
* Erick Díaz
* Alpala Saúl
* Leonel Tualombo









