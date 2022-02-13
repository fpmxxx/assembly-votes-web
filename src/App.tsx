import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavbarMenu from './components/navbarMenu';
import PautaForm from './pages/pautaForm';

export default function App() {
	return (
		<div className='App'>
			<NavbarMenu />

			<Routes>
				<Route path="/" element={<PautaForm />} />
				{/* <Route path="/stave/list" element={<StaveList />} /> */}
				{/* <Route path="/" element={<VoteList />} /> */}
				{/* <Route path="/vote/list" element={<VoteList />} /> */}
				{/* <Route path="/vote/form/:id/:staveName" element={<VoteForm />} /> */}
			</Routes>
		</div>
	)
}