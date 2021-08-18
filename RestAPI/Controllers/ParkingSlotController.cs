using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Models;


namespace RestAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ParkingSlotController : Controller
    {
        public static List<ParkingSlot> parkingSlots = new List<ParkingSlot>() {
            new ParkingSlot(){id="rfgyh67g",state = "in use",type = "AGR-845"},
            new ParkingSlot(){id="rf65h67g",state = "free",type = null},
            new ParkingSlot(){id="vgyh67g",state = "in use",type = "AYU-450"},
            new ParkingSlot(){id="rfxyh67g",state = "in use",type = "AGR-845"},
            new ParkingSlot(){id="rf85h67g",state = "free",type = null},
            new ParkingSlot(){id="cvgyh67g",state = "in use",type = "AYU-450"},
            new ParkingSlot(){id="ahgyh67g",state = "in use",type = "AGR-845"},
            new ParkingSlot(){id="iop5h67g",state = "free",type = null},
            new ParkingSlot(){id="cvgy897g",state = "in use",type = "AYU-450"}


        };
        /// <summary>
        /// Devuelve todas los espacios existentes
        /// </summary>
        /// <param name="fields">Campos de cada reserva que se quieren consultar</param>
        /// <returns></returns>
        [HttpGet]
        [Route("spaces")]
        public  ActionResult<List<ParkingSlot>> GetParkingSlots(string fields="") {
            switch (fields)
            {
                default:
                    return Ok(parkingSlots.Select(x => new { x.state, x.id, x.type }));

                case "state,id":
                    return Ok(parkingSlots.Select(x => new { x.state, x.id }));

                case "state,type":
                    return Ok(parkingSlots.Select(x => new { x.state, x.type }));

                case "type,id":
                    return Ok(parkingSlots.Select(x => new { x.id, x.type }));

                case "state":
                    return Ok(parkingSlots.Select(x => new { x.state }));

                case "type":
                    return Ok(parkingSlots.Select(x => new { x.type }));

                case "id":
                    return Ok(parkingSlots.Select(x => new { x.id }));
            }

        }
        [HttpGet]
        [Route("pages")]
        public ActionResult<List<ParkingSlot>> GetTotalPagesSlots()
        {
            return Ok((int)Math.Ceiling((double)parkingSlots.Count()/3));

        }
        /// <summary>
        /// Devuelve los espacios que pertenecen a la pagina solicitada, con los atributos que se soliciten.
        /// </summary>
        /// <param name="page">Número de pagina que se desea consultar</param>
        /// <param name="fields">Campos de cada espacio que se quieren consultar</param>
        /// <returns></returns>
        [HttpGet]
        [Route("spaces/page/{page}")]
        public ActionResult<List<ParkingSlot>> GetParkingSlotsPage(int page,string fields="")
        {

            switch (fields)
            {
                default:
                    return Ok(parkingSlots.OrderBy(c => c.id)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.state, x.id, x.type }));

                case "state,id":
                    return Ok(parkingSlots.OrderBy(c => c.id)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.state, x.id }));

                case "state,type":
                    return Ok(parkingSlots.OrderBy(c => c.id)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.state, x.type }));

                case "type,id":
                    return Ok(parkingSlots.OrderBy(c => c.id)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.id, x.type }));

                case "state":
                    return Ok(parkingSlots.OrderBy(c => c.id)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.state }));

                case "type":
                    return Ok(parkingSlots.OrderBy(c => c.id)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.type }));

                case "id":
                    return Ok(parkingSlots.OrderBy(c => c.id)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.id }));
            }

        
        }
       /// <summary>
       /// Retorna un espacio especifico
       /// </summary>
       /// <param name="id">Identificador del espacio que se quiere consultar</param>
       /// <returns></returns>
        [HttpGet]
        [Route("spaces/{id}")]
        public ActionResult<ParkingSlot> GetParkingSlotsByID(string id)
        {
            for (int i = 0; i < parkingSlots.Count; i++) {
                if (parkingSlots[i].id == id) {
                    return parkingSlots[i];
                    
                }
            }
            
            return NotFound();
        }
        /// <summary>
        /// Crea un nuevo espacio
        /// </summary>
        /// <param name="parkingSlot">Espacio que se desea crear</param>
        /// <returns></returns>
        [HttpPost]
        [Route("spaces")]
        public IActionResult AddParkingSlots([FromBody] ParkingSlot parkingSlot){
            if (ModelState.IsValid)
            {
                Guid obj = Guid.NewGuid();
                parkingSlot.id = obj.ToString();
                parkingSlot.state = "Free";
                parkingSlots.Add(parkingSlot);
                return Ok("Successfully Added!");
            }
            
            return BadRequest("Bad structure in data provided");
            
        }
        /// <summary>
        /// Edita los campos de un espacio
        /// </summary>
        /// <param name="id">Identificador del espacio a editar</param>
        /// <param name="space">Espacio editado</param>
        /// <returns></returns>
        [HttpPut]
        [Route("spaces/{id}")]
        public ActionResult<List<ParkingSlot>> UpdateParkingSlots(string id, [FromBody] ParkingSlot space)
        {
            for (int i = 0; i < parkingSlots.Count; i++)
            {
                if (parkingSlots[i].id == id)
                {
                    parkingSlots[i].state = space.state;
                    parkingSlots[i].type = space.type;
                    return Ok("Successfully Updated!");
                }
            }
            return NotFound();
        }
        /// <summary>
        /// Elimina un espacio
        /// </summary>
        /// <param name="id">Identificador del espacio a eliminar</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("spaces/{id}")]
        public ActionResult<List<ParkingSlot>> DeleteParkingSlots(string id)
        {
            for (int i = 0; i < parkingSlots.Count; i++)
            {
                if (parkingSlots[i].id == id)
                {
                    if (parkingSlots[i].state == "Free")
                    {
                        parkingSlots.RemoveAt(i);
                        
                    }
                    else {
                        return BadRequest("Space in use");                        
                    }
                }
            }
            return Ok("Disappeared from this planet!");
        }

    }
}
