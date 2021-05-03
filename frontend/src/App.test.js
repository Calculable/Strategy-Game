import {render, screen} from '@testing-library/react';
import App from './App';
import AboutPage from "./pages/about";
import {FakeApiService} from "./services/fake-api-service"

test('renders title', () => {
    render(<App/>);
    const textElement = screen.getByText(/Welcome to Strategy Game/i);
    expect(textElement).toBeInTheDocument();
});

test('renders about', () => {
    render(<AboutPage/>);
    const textElement = screen.getByText(/Distributed Systems and Blockchain/i);
    expect(textElement).toBeInTheDocument();
});

test('fake api service returns workplaces', () => {
    expect(Object.keys(fakeApiService.getWorkplaceStats()).length).toBeGreaterThan(0);
});

