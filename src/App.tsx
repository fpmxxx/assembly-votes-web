import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavbarMenu from './components/navbarMenu';
import PautaForm from './pages/pautaForm';
import PautaList from './pages/pautaList';

export default function App() {
	return (
		<div className='App'>
			<NavbarMenu />

			<Routes>
				<Route path="/" element={<PautaForm />} />
				<Route path="/pauta/list" element={<PautaList />} />
				{/* <Route path="/" element={<VoteList />} /> */}
				{/* <Route path="/vote/list" element={<VoteList />} /> */}
				{/* <Route path="/vote/form/:id/:staveName" element={<VoteForm />} /> */}
			</Routes>
		</div>
	)
}