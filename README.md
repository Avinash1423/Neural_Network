# Neural Network Based Self-Driving Car Simulation

A self-driving car simulation built primarily with **JavaScript**, **HTML Canvas**, and **React.js**.  

Each car is equipped with a **sensor system** composed of multiple ray sensors that calculate intersections with road borders and other vehicles, producing offset values. These values are processed by a **feedforward neural network**, which transforms the inputs through weighted connections and biases into output signals controlling the car’s movement.

To enable learning, the simulation initializes a population of cars, each with its own neural network. A **fitness function** evaluates performance based on distance traveled, and the best-performing car is selected. A simplified **genetic algorithm** is applied: the top neural network is cloned across the population, small random mutations are introduced, and cars that collide with obstacles are removed from the evolutionary process. Over successive generations, the population converges toward neural networks capable of stable driving and obstacle avoidance in traffic.
---

## Live Demo
[Check it out here](https://neural-network-avinash.onrender.com/)

## GitHub Repository
[View on GitHub](https://github.com/Avinash1423/Neural_Network/tree/unlimitedTraffic/car)

---
Project Inspired by ideas from Radu Mariescu-Istodor’s self-driving car series.

## Tech Stack
- JavaScript  
- React.js  
- HTML Canvas  

