using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class Reservation
    {
        public string  licensePlate { get; set; }
        public string  idSlotAssigned { get; set; }
        public string time {get; set; }
    }
}
