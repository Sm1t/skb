var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE4ZDJiMTJmYjc0ZDAwMTFiZTdjYWQiLCJ1c2VybmFtZSI6InNldHAuc20xdEBtYWlsLnJ1Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE0NzgwMjE4MTN9.0I4RwV2NtomfCtsp02cYsDVNKeIfnHpf79ECckOiGQE';
var skb = new Skb(token);
skb.taskHelloWorld('Любой ваш текст тут');