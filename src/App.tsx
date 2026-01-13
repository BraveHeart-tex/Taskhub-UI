import { ModeToggle } from './components/mode-toggle';

export function App() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-red-500 text-4xl font-bold tracking-tight'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
        natus?
      </div>
      <ModeToggle />
    </div>
  );
}
