import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css"
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; 


export default function InfoBox({info}){  
    const INIT_URL="https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
    const HOT_URL="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwc2Vhc29ufGVufDB8fDB8fHww";
    const COLD_URL="https://images.unsplash.com/photo-1617120351334-7922c6cfcfca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdpbnRlciUyMHNlYXNvbnxlbnwwfHwwfHx8MA%3D%3D";
    const RAIN_URL="https://media.istockphoto.com/id/1263562386/photo/beautifully-structured-thunderstorm-in-bulgarian-plains.webp?a=1&b=1&s=612x612&w=0&k=20&c=5JbnjvMjP0e-eOi9OhaS6CzHR_I3UWdkZaYjDcBjL94=";
    return (
        <div className="InfoBox">
         <div className="cardContainer"> 
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity > 80 ?  RAIN_URL:info.temp > 15 ? HOT_URL : COLD_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
       {info.city}
       
       {info.humidity > 80 ? 
            <ThunderstormIcon/>:info.temp > 15 ? 
            <WbSunnyIcon/> : <AcUnitIcon/>}
 

        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
        <p>Temperature ={info.temp}&deg;C</p>
        <p>humidity ={info.humidity }&deg;C</p>
        <p>Max Temperature ={info.tempMax}&deg;C</p>
        <p>Min Temperature ={info.tempMin}&deg;C</p>
        <p>The weather can bee described as <i>{info.weather} and feels like {info.feelslike}&deg;C</i></p>
          </Typography>
      </CardContent>
  
    </Card>
    </div>
        </div>
    );
}