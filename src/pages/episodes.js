import React, { useEffect, useState } from 'react'

export default function Episodes() {

  const [episodes, setEpisodes] = useState([]);
  const fetchCharacters = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const graphql = JSON.stringify({
        query:
          "query{\r\nepisodes{\r\n    results{\r\n        name\r\n        characters{\r\n                   image\r\n        }\r\n        }\r\n        \r\n    }\r\n}\r\n\r\n",
        variables: {},
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
      };
      const response = await fetch(
        "https://rickandmortyapi.com/graphql",
        requestOptions
      );

      const result = await response.json();
        console.log("result :>> ", result);
         setEpisodes(result.data.episodes.results);
    } catch (error) {
      console.log("error :>> ", error);
    }
    };
    

  useEffect(() => {
    fetchCharacters();
  }, []);

   return (
    <>
       <div>
         <div>
        <p >Episodes</p>
       </div>
  <div className="mx-auto max-w-[90%]">
  <table className="w-full">
    <thead>
      <tr>
        <th className="border border-gray-300 p-2 bg-gray-200 text-left">#</th>
        <th className="border border-gray-300 p-2 bg-gray-200 text-left">Name</th>
        <th className="border border-gray-300 p-2 bg-gray-200 text-left">Featured Characters</th>
      </tr>
    </thead>
    <tbody>
      {episodes.map((episode, index) => (
        <tr key={index}>
          <td className="border border-gray-300 p-2 text-left">{index + 1}</td>
          <td className="border border-gray-300 p-2 text-left">{episode.name}</td>
          <td className="border border-gray-300 p-2 text-left">
            <div className="flex">
              {episode.characters.map((character, charIndex) => (
                <img 
                  key={charIndex} 
                  src={character.image} 
                  alt={`Character ${charIndex}`} 
                  className="w-12 mr-2.5"
                />
              ))}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      </div>
    </>
  );
}
