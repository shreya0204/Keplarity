// Theory
// Pipe connecting here the readable stream to a writeable stream.
/* The best habitable planet is that which matches the flux where flux is the measure of amount of light or energy it gets from it's sun
The planet should not get about more than 1.11 times the amount of light our earth get and not less than 0.36 times.
*/
import { parse } from "csv-parse";
import { createReadStream } from "fs";

const habitablePlanets = [];

const IshabitablePlanets = (planet) =>{
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
      if(IshabitablePlanets(data)){
        habitablePlanets.push(data);
      }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(habitablePlanets.map((planet)=>{
        return planet['kepler_name']
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });
