
const path = require('path')
var soap = require('strong-soap').soap
var express = require('express')
const { Console } = require('console')

const app = express()
const port = process.env.PORT || 3000

const bluePrismUserName = 'admin' // Your Blue Prism User name
const bluePrismPassword = 'bp$BP668160#' // Your Blue Prism Password

var WSDL = soap.WSDL

var url = 'http://GH-HP-ENVY-17:8181/ws/CalculatorBO?wsdl' // your url 

const http_options = {
    wsdl_headers:{'Connection':'keep-alive'}
}

app.get('/', (req,res) => res.send('REST-SOAP Proxy - Blue Prism From Nodejs - Blue Prism DX Team'))

app.get('/api',(req, res) => { 
        return res.send('usage: /add/<func>/value1/value2 - func = Add/Subtract/Multiply/Divide')
})

const clientPromise = new Promise((resolve, reject) => (
    soap.createClient(url, http_options, (err, client) => {
        err ? reject(err) : resolve(client)
    })))
  

app.get('/api/add/:v1/:v2',  (req,res) => (clientPromise.then(client => ({client, req}))
    .then(invokeAdd)
    .then((results) =>{ return res.status(200).send({soapResult:results})})
    .catch((  error ) => {
        return res.status(400).send({error})})
))

app.get('/api/subtract/:v1/:v2',(req,res) => (clientPromise.then(client => ({client, req}))
.then(invokeSubtract)
.then((results) =>{ return res.status(200).send({soapResult:results})})
.catch((  error ) => {
    return res.status(400).send({error})})
))

app.get('/api/multiply/:v1/:v2',(req,res) => (clientPromise.then(client => ({client, req}))
.then(invokeMultiply)
.then((results) =>{ return res.status(200).send({soapResult:results})})
.catch((  error ) => {
    return res.status(400).send({error})})
))

app.get('/api/divide/:v1/:v2',(req,res) => (clientPromise.then(client => ({client, req}))
.then(invokeDivide)
.then((results) =>{ return res.status(200).send({soapResult:results})})
.catch((  error ) => {
    return res.status(400).send({error})})
))

app.listen(port, ()=> {
    console.log('REST-SOAP Proxy is up on port '+port+'.')
})

const invokeAdd = ({client, req}) => new Promise((resolve, reject) => {
    const dateStart = Date.now()
    console.log(`Add Start - ${new Date(dateStart)}`)
    client.setSecurity(new soap.BasicAuthSecurity(bluePrismUserName,bluePrismPassword))
    client.Add({bpInstance:'auto',Value1:req.params.v1,Value2:req.params.v2}, (err,result,envelope,soapHeader) => {
        err  ? reject(err) : resolve(result.Result)
    const dateComplete = Date.now()
    console.log(`Add Completed = ${new Date(dateComplete)}`)
})})

const invokeSubtract = ({client, req}) => new Promise((resolve, reject) => {
    const dateStart = Date.now()
    console.log(`Subtract Start - ${new Date(dateStart)}`)
    client.setSecurity(new soap.BasicAuthSecurity(bluePrismUserName,bluePrismPassword))
    client.Subtract({bpInstance:'auto',Value1:req.params.v1,Value2:req.params.v2}, (err,result,envelope,soapHeader) => {
        err  ? reject(err) : resolve(result.Result)
    const dateComplete = Date.now()
    console.log(`Subtract Complete - ${new Date(dateComplete)}`)
})})

const invokeMultiply = ({client, req}) => new Promise((resolve, reject) => {
    const dateStart = Date.now()
    console.log(`Multiply Start - ${new Date(dateStart)}`)
    client.setSecurity(new soap.BasicAuthSecurity(bluePrismUserName,bluePrismPassword))
    client.Multiply({bpInstance:'auto',Value1:req.params.v1,Value2:req.params.v2}, (err,result,envelope,soapHeader) => {
        err  ? reject(err) : resolve(result.Result)
    const dateComplete = Date.now()
    console.log(`Multiply Complete - ${new Date(dateComplete)}`)
})})

const invokeDivide = ({client, req}) => new Promise((resolve, reject) => {
    const dateStart = Date.now()
    console.log(`Divide Start - ${new Date(dateStart)}`)
    client.setSecurity(new soap.BasicAuthSecurity(bluePrismUserName,bluePrismPassword))
    client.Divide({bpInstance:'auto',Value1:req.params.v1,Value2:req.params.v2}, (err,result,envelope,soapHeader) => {
        err  ? reject(err) : resolve(result.Result)
    const dateComplete = Date.now()
    console.log(`Divide Complete - ${new Date(dateComplete)}`)
})})


