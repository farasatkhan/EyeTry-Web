import React from "react"

const filter = () => {
    return(
<div class="bg-gray-100 p-4 flex items-center space-x-4  whitespace-no-wrap">
  <div class="relative group cursor-pointer">
    <span class="text-gray-800">Colors</span>
    <div class="hidden absolute left-0 mt-2 p-4 bg-white shadow-lg group-hover:block w-64">
      <ul class="space-y-2">
        <li><a href="#" class="text-gray-700 hover:text-indigo-600">All Colors</a></li>
 
      </ul>
      <div class="mt-4 ">

             <label>Opacity</label>
             <input type="range" min="0" max="100" step="10" />

             <label>Opacity</label>
             <input type="range" min="0" max="100" step="10" />
      
      </div>
    </div>
  </div>

  <div class="relative group cursor-pointer">
    <span class="text-gray-800">Material</span>
    <div class="hidden absolute left-0 mt-2 p-4 bg-white shadow-lg group-hover:block w-64">
      <ul class="space-y-2">
        <li><a href="#" class="text-gray-700 hover:text-indigo-600">Acetate</a></li>
   
      </ul>
      <div class="mt-4 ">
  
             <label>Thickness</label>
             <input type="range" min="0" max="10" step="1" />


      </div>
    </div>
  </div>

</div>

    )
}


export default filter;