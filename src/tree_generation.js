import sobreiro from "./sobreiro.js";
import tree from "./sobreiro.js";
import t from "./terrain.js";

function iterateGrid(scene){

    var width = 5000;   //comprimento do plano
    var height = 5000;      //largura do plano
    
    var numSegmentsX = 500;     //comprimento do chunk
    var numSegmentsY = 500;     //largura do chunk
    
    var probability = 0.1;  //probabilidade de os sobreiros spawnarem num chunk

    const minHeight = 100;  //altura minima dos sobreiros
    const maxHeight = 400;  //altura maxima

    const minAngle = 0;     //angulo minimo dos sobreiros
    const maxAngle = 2 * Math.PI;      //angulo maximo

    for (let j = -width/2; j <= width/2; j += numSegmentsX) {
        for (let i = -height/2; i <= height/2; i += numSegmentsY) {
            
            var randomAngle = Math.random() * (maxAngle - minAngle) + minAngle;
            var randomHeight = Math.random() * (maxHeight - minHeight) + minHeight;
            var randomNum = Math.random();
            
            //tentativa de aceder ao y do plano 
            
            //const n = j*((width/2)+1)+i;
            //var vertex = t.terrain.geometry.vertices[n];
            //var yCoordinate = vertex.y;

            if (randomNum < probability) {
                var sobreiro = new tree.Sobreiro(randomHeight, randomAngle);
                sobreiro.position.set(j/2, 0,i/2);
                scene.add(sobreiro);
            } 
        }
    }
}

export default {
    iterateGrid: iterateGrid
}