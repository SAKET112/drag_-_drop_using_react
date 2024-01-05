import "./Card.scss";
import { data } from "../db";
import React from "react";


const Card = () => {

  const [list, setList] = React.useState(data)


        // These are references to keep track of the dragged item and the item it's dragged over
        const dragItem = React.useRef<number | null>(null);
        const dragOverItem = React.useRef<number | null>(null);
        

        //Handling start of the drag operation
        const handleDragStart = (index: number) => {
             dragItem.current = index;
        };
        
        //Function to handle when an element is dragged over another item
        const handleDragEnter = (index: number) => {
            dragOverItem.current = index;
        };


        //Function to handle when an the drag operation is ended
        const handleDragEnd = () => {

            // Check if both dragItem and dragOverItem are not null
            if (dragItem.current !== null && dragOverItem.current !== null) {
                
                // Create a copy of the current list
                const newList = [...list];
            
                // Swap the positions of the dragged item and the item it's dropped onto
                const [draggedItem] = newList.splice(dragItem.current, 1);
                newList.splice(dragOverItem.current, 0, draggedItem);

                // Update indexes for the dragged item and items below it
                const startIndex = Math.min(dragItem.current, dragOverItem.current);
                const endIndex = Math.max(dragItem.current, dragOverItem.current) + 1;

                for (let i = startIndex; i < endIndex; i++) {
                    newList[i] = { ...newList[i], id: i + 1 };
                }
                
                // Update the state with the modified list
                setList(newList);
            }

            // Reset the dragItem and dragOverItem refs
            dragItem.current = null;
            dragOverItem.current = null;
        };
        

  return (
    <div className="cardContainer">
        {list.map((item, index) => (
            <div 
                className="card" 
                key={index} 
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
            >
                        <h3>{item.id}.</h3>
                        <h3>{item.name}</h3>
                        <h3>{item.place}</h3>
                        <h3>{item.city}</h3>
            </div>
        )
        )}
    </div>
  )
}

export default Card