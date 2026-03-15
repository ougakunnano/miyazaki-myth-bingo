const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const spots = require("./data/spots.json")
const myths = require("./data/myths.json")

app.get("/spots",(req,res)=>{
res.json(spots)
})

app.get("/myths",(req,res)=>{
res.json(myths)
})

function distance(lat1,lon1,lat2,lon2){

const R=6371000

const dLat=(lat2-lat1)*Math.PI/180
const dLon=(lon2-lon1)*Math.PI/180

const a=
Math.sin(dLat/2)**2+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)**2

const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))

return R*c

}

app.post("/stamp",(req,res)=>{

const {lat,lon}=req.body

let result=null

spots.forEach(spot=>{

const d=distance(lat,lon,spot.lat,spot.lon)

if(d<50){
result=spot
}

})

if(result){
res.json({success:true,spot:result.name})
}else{
res.json({success:false})
}

})

app.listen(3000,()=>{
console.log("server start")
})