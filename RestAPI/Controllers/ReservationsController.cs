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
        public static List<Reservation> reservations = new List<Reservation>() {
            new Reservation(){idSlotAssigned="rfgyh67g",time = "11:00am",licensePlate = "BFR-845"},
            new Reservation(){idSlotAssigned="cvgyh67g",time = "1:00pm",licensePlate = "AYU-470"},
            new Reservation(){idSlotAssigned="ahgyh67g",time = "11:00am",licensePlate = "OPH-845"},
            new Reservation(){idSlotAssigned="iop5h67g",time = "1:00pm",licensePlate = "AYT-450"},
            new Reservation(){idSlotAssigned="rf65h67g",time = "11:00am",licensePlate = "AGR-845"},
            new Reservation(){idSlotAssigned="cvgy587g",time = "1:00pm",licensePlate = "YUU-450"}


        };
        /// <summary>
        /// Devuelve todas las reservas existentes
        /// </summary>
        /// <param name="fields">Campos de cada reserva que se quieren consultar</param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<List<Reservation>> GetReservations(string fields="")
        {
            switch (fields)
            {
                default:
                    return Ok(reservations.Select(x => new { x.licensePlate, x.idSlotAssigned, x.time }));

                case "licensePlate,idSlotAssigned":
                    return Ok(reservations.Select(x => new { x.licensePlate, x.idSlotAssigned }));

                case "licensePlate,time":
                    return Ok(reservations.Select(x => new { x.licensePlate, x.time }));

                case "idSlotAssigned,time":
                    return Ok(reservations.Select(x => new {  x.idSlotAssigned, x.time }));

                case "licensePlate":
                    return Ok(reservations.Select(x => new { x.licensePlate }));

                case "idSlotAssigned":
                    return Ok(reservations.Select(x => new { x.idSlotAssigned }));
                case "time":
                    return Ok(reservations.Select(x => new { x.time }));

            }
        }
        [HttpGet]
        [Route("pages")]
        public ActionResult<List<ParkingSlot>> GetTotalPagesSlots()
        {
            return Ok((int)Math.Ceiling((double)reservations.Count() / 3));

        }
        /// <summary>
        /// Devuelve las reservas que pertenecen a la pagina solicitada, con los atributos que se soliciten.
        /// </summary>
        /// <param name="page">Número de pagina que se desea consultar</param>
        /// <param name="fields">Campos de cada reserva que se quieren consultar</param>
        /// <returns></returns>
        [HttpGet]
        [Route("page/{page}")]
        public ActionResult<List<ParkingSlot>> GetParkingSlotsPage(int page, string fields = "")
        {

            switch (fields)
            {
                default:
                    return Ok(reservations.OrderBy(c => c.licensePlate)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.licensePlate, x.idSlotAssigned, x.time }));

                case "licensePlate,idSlotAssigned":
                    return Ok(reservations.OrderBy(c => c.licensePlate)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.licensePlate, x.idSlotAssigned }));

                case "licensePlate,time":
                    return Ok(reservations.OrderBy(c => c.licensePlate)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.licensePlate, x.time }));

                case "idSlotAssigned,time":
                    return Ok(reservations.OrderBy(c => c.licensePlate)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.idSlotAssigned, x.time }));

                case "licensePlate":
                    return Ok(reservations.OrderBy(c => c.licensePlate)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.licensePlate }));

                case "idSlotAssigned":
                    return Ok(reservations.OrderBy(c => c.licensePlate)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.idSlotAssigned }));
                case "time":
                    return Ok(reservations.OrderBy(c => c.licensePlate)
                .Skip((page) * 3)
                .Take(3)
                .ToList().Select(x => new { x.time }));
            }
               


        }
        /// <summary>
        /// Crea una nueva reserva
        /// </summary>
        /// <param name="reservation">Reserva que se desea crear</param>
        /// <returns></returns>
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
                        parkingSlots[i].state = "Occupied";
                        return Ok("Reserved!");
                    }
                }

                return NotFound("Parking lot is full!");
                
            }

            return BadRequest("Bad structure in data provided");

        }
        /// <summary>
        /// Elimina una reserva
        /// </summary>
        /// <param name="id">Identificador de la reserva a eliminar</param>
        /// <returns></returns>
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
            return Ok("Deleted!");
        }
    }
}
