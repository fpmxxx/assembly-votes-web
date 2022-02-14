import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavbarMenu from './components/navbarMenu';
import PautaForm from './pages/pautaForm';
import PautaList from './pages/pautaList';
import VotoList from './pages/votoList';
import VotoForm from './pages/votoForm';

export default function App() {
	return (
		<div className='App'>
			<NavbarMenu />

			<Routes>
				<Route path="/" element={<PautaForm />} />
				<Route path="/pauta/list" element={<PautaList />} />
				<Route path="/" element={<VotoList />} />
				<Route path="/voto/list" element={<VotoList />} />
				<Route path="/voto/form/:id/:pauta" element={<VotoForm />} />
			</Routes>
		</div>
	)
}