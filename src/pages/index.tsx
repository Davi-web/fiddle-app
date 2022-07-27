import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPerson";
import { inferQueryInput, inferQueryOutput, trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const [ids, setIds] = useState(()=>getOptionsForVote());
  const [first, second] = ids;
  const firstPerson = trpc.useQuery(["example.get-person-by-id", {id: first as number}]);
  const secondPerson = trpc.useQuery(["example.get-person-by-id", {id: second as number}]);



  const voteWhoIsMorePleasant = (selected: number) => {
    if(selected === first) {
      
    }
    setIds(getOptionsForVote());
  }

  return (
    
    <div className="h-screen w-screen flex flex-col  items-center">

      <div className="pt-10 pb-5 text-2xl ">Who do you have pleasant memories with?</div>
      {!firstPerson.isLoading && firstPerson.data && !secondPerson.isLoading && secondPerson.data && (
        <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <CharacterListing character={firstPerson.data as RickAndMortyCharacterFromServer} vote={()=> voteWhoIsMorePleasant(first as number)}/>
        <div className="p-8">vs.</div>
        <CharacterListing character={secondPerson.data as RickAndMortyCharacterFromServer} vote={()=> voteWhoIsMorePleasant(second as number)}/>
      </div>

      )}

        
      
      
    </div>
  );

};

type RickAndMortyCharacterFromServer = inferQueryOutput<"example.get-person-by-id">;

const CharacterListing: React.FC<{character: RickAndMortyCharacterFromServer, vote: ()=> void}> = (props) => {
  return (<div className="w-128 h-128 flex flex-col">
  <img className='p-5' src={props.character?.image}/>
  
  <a onClick={()=>props.vote()} href="#_" className="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group">
<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
</span>
<span className="relative text-white">{props.character?.name}</span>
<span className="relative pl-3"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg></span>

</a>
</div>);
}

// const TechnologyCard = ({
//   name,
//   description,
//   documentation,
// }: TechnologyCardProps) => {
//   return (
//     <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
//       <h2 className="text-lg text-gray-700">{name}</h2>
//       <p className="text-sm text-gray-600">{description}</p>
//       <a
//         className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
//         href={documentation}
//         target="_blank"
//         rel="noreferrer"
//       >
//         Documentation
//       </a>
//     </section>
//   );
// };

export default Home;
