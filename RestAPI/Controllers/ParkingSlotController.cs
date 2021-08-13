using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Models;

namespace RestAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ParkingSlotController : ControllerBase
    {
        public static List<ParkingSlot> parkingSlots = new List<ParkingSlot>();

        [HttpGet]
        [Route("spaces")]
        public ActionResult<List<ParkingSlot>> GetParkingSlots() {
            return parkingSlots;
        }
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
