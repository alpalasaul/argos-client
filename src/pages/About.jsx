import React from "react";
import Card from "./Card";
import data from "./data.js"

const About = () => {
  return (
    <div>
      <div>
        <p className="text-3xl mt-5 text-center mb-5 font-bold">
          Acerca de los {""}
          <span className="text-green-600 font-bold">desarrolladores</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        {
            data.map(card => 
                <Card key={card.id} card={card}/>
            )
        }
      </div>
    </div>
  );
};

export default About;
