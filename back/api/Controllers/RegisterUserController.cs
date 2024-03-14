using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/users/")]
    [ApiController]
    public class RegisterUserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public RegisterUserController(ApplicationDBContext context )
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.RegisterUser.ToList();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var user = _context.RegisterUser.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}