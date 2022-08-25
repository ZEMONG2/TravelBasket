import List from './List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const DnDPractice = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <List />
    </DndProvider>
  );
};
export default DnDPractice;
