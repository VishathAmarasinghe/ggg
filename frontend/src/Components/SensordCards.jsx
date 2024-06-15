import TemperatureVsTimeChart from './TemperatureVsTimeChart';

const SensordCards = () => {
  return(
    <> 

    <div className="flex justify-center">
       <div className="flex box-context w-10/12 h-20 m-2 rounded-lg border-2 border-green-700 bg-green-100">
          <div className="w-96 border-r-2 border-green-700"></div>
          <div className="w-96 border-r-2 border-green-700"></div>
          <div className="w-96"></div>
       </div>
      
    </div>

    <div className="flex gap-10">

      <div className="flex flex-col p-2 my-auto justify-center items-center box-context w-64 h-[28rem] bg-[#bcedcb] shadow-lg rounded-lg">

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl">
         <div className="flex justify-center mt-1">
           <p className="sensorText">Sensor 01</p>
         </div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
       <div></div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
       <div></div>
      </div>

      <div className="box-context w-56 h-56 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
        <div> <TemperatureVsTimeChart/></div>
      </div>

      </div>

      <div className="flex flex-col p-2 my-auto justify-center items-center box-context w-64 h-[28rem] bg-[#bcedcb] shadow-lg rounded-lg">

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl">
         <div className="flex justify-center mt-1">
           <p className="font-semibold text-2xl">Sensor 01</p>
         </div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
        <div></div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
       <div></div>
      </div>

      <div className="box-context w-56 h-56 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
      <div>

    </div>

</div>



      </div>

      <div className="flex flex-col p-2 my-auto justify-center items-center box-context w-64 h-[28rem] bg-[#bcedcb] shadow-lg rounded-lg">

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl">
         <div className="flex justify-center mt-1">
           <p className="font-semibold text-2xl">Sensor 01</p>
         </div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
        <div></div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
         <div></div>
      </div>

      <div className="box-context w-56 h-56 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
      <div>

    </div>

</div>



      </div>

      <div className="flex flex-col p-2 my-auto justify-center items-center box-context w-64 h-[28rem] bg-[#bcedcb] shadow-lg rounded-lg">

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl">
         <div className="flex justify-center mt-1">
           <p className="font-semibold text-2xl">Sensor 01</p>
         </div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
        <div></div>
      </div>

      <div className="box-context w-56 h-12 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
         <div></div>
      </div>

      <div className="box-context w-56 h-56 bg-white rounded-lg shadow-green-900 shadow-xl mt-4">
      <div>

    </div>

</div>



      </div>

    </div>
    </>
  );
};

export default SensordCards;
