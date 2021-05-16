const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forcast = require('./utils/forcast')
const geoLocation = require('./utils/geoLocation')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render("index",{
        title: "Weather",
        name: "Arun Kashyap"
    })
})

app.get("/about", (req, res) => {
    res.render("about",{
        title: "Vaction Plan",
        name: "Arun Kashyap"
    })
})

app.get("/help", (req, res) => {
    res.render("help",{
        title: "Here to help",
        name: "Arun Kashyap"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address needs to be passed"
        })
    }
    geoLocation(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: "Error Occured while fetching geoLocation"
            })
        }
        forcast(latitude, longitude, (error, forcastReponse) => {
            if (error) {
                return res.send({
                    error: "Error Occured while fetching forcast"
                })
            }
            //console.log(location)
            return res.send({
                location,
                forcast: forcastReponse
            })
        })
    })

    
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "Error Page",
        name: "Arun Kashyap",
        message: "No heper page available"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "Error Page",
        name: "Arun Kashyap",
        message: "No page to display"
    })
})

app.listen(3000, () => {
    console.log("App Started")
})