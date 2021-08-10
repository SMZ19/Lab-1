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
    public class ReservationsController : ControllerBase
    {
        public static List<ParkingSlot> parkingSlots = ParkingSlotController.parkingSlots;
        public static List<Reservation> reservations = new List<Reservation>();

        [HttpGet]
        public ActionResult<List<Reservation>> GetReservations()
        {
            return reservations;
        }
        [HttpPost]
        public IActionResult AddReservation([FromBody] Reservation reservation)
        {
            if (ModelState.IsValid)
            {
                for (int i = 0; i < parkingSlots.Count; i++)
                {
                    if (parkingSlots[i].state == "Free")
                    {
                        reservation.idSlotAssigned = parkingSlots[i].id;
                        DateTime now = DateTime.Now;
                        reservation.time = now.ToString("t");
                        reservations.Add(reservation);
                        parkingSlots[i].state = "Ocupied";
                        return Ok("Reserved!");
                    }
                }

                return NotFound("Parking lot is full!");
                
            }

            return BadRequest("Bad structure in data provided");

        }
        [HttpDelete]
        [Route("{id}")]
        public ActionResult<List<Reservation>> DeleteReservation(string id)
        {
            
            for (int i = 0; i < reservations.Count; i++)
            {
                
                if (reservations[i].idSlotAssigned == id)
                {
                    reservations.RemoveAt(i);

                }
            }
            for (int i = 0; i < parkingSlots.Count; i++)
            {
                if (parkingSlots[i].id == id)
                {
                   parkingSlots[i].state= "Free";
                }
            }
            return Ok(reservations);
        }
    }
}
