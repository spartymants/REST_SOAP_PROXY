# REST-SOAP Proxy

A proof of concept to call a Blue Prism SOAP Service, using a NodeJS application exposing REST endpoints.

This example takes the CalculatorBO object, exposes it as a SOAP service with 4 functions. Add, Subtract, Multiply and Divide. We then create a nodeJS application that will provide REST endpoints to match each SOAP endpoint. We then provide pass-thru to the Blue Prism object returning the answer to the problem posed.
