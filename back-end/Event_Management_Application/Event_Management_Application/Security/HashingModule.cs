using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace Event_Management_Application.Security
{
    public class HashingModule
    {
        public HashingModule()
        {

        }

        public string HashString(string text)
        {
            string salt = "G-KaPdSgVkYp2s5v";
            string pepper = "3s6v9y$B&E)H@McQ";
            string seasonedText = $"{salt}{text}{pepper}";
            HashAlgorithm sha256Algo = SHA256.Create();
            Encoding encoder = new UTF8Encoding();
            byte[] textAsBytes = encoder.GetBytes(seasonedText);
            byte[] hash = sha256Algo.ComputeHash(textAsBytes);
            return encoder.GetString(hash);
        }
    }
}
