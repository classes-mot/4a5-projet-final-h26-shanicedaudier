import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ArtisteList from "./ArtisteList";
import "@testing-library/jest-dom";

//Mock des assets pour éviter les erreurs d'import d'images
vi.mock("../../assets/city.webp", () => ({ default: "city.webp" }));

//Mock ArtisteCard pour tester seulement ArtisteList (test intégration partielle)
vi.mock("../artisteCard/ArtisteCard", () => ({
    default: ({ name, category }) => (
        <li>
            <h2>{name}</h2>
            <p>{category}</p>
        </li>
    ),
}));

//Mock Modal
vi.mock("../modal/modal", () => ({
    default: ({ children, onCancel, onConfirm }) => (
        <div>
            {children}
            <button onClick={onCancel}>Annuler</button>
            <button onClick={onConfirm}>Confirmer</button>
        </div>
    ),
}));

const mockAuth = {
    loggedIn: false,
    userId: null,
    login: vi.fn(),
    logout: vi.fn(),
};

const artistesMock = [
    { id: "a1", name: "Enima", category: "Rap", songPop: "À l'aise", description: "Desc 1", image: null },
    { id: "a2", name: "Lost", category: "Rap", songPop: "Iceberg", description: "Desc 2", image: null },
    { id: "a3", name: "Shreez", category: "Rap", songPop: "Diamant", description: "Desc 3", image: null },
];

beforeEach(() => {
    localStorage.clear();
});

describe("Composant ArtisteList (intégration)", () => {

    //TI 1 - ArtisteList affiche tous les artistes passés en props
    it("affiche le bon nombre d'artistes et leurs noms", () => {
        render(
            <AuthContext.Provider value={mockAuth}>
                <MemoryRouter>
                    <ArtisteList items={artistesMock} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Assert - vérifie que les 3 artistes sont bien rendus
        const titres = screen.getAllByRole("heading", { level: 2 });
        expect(titres.length).toBe(3);
        expect(screen.getByText("Enima")).toBeInTheDocument();
        expect(screen.getByText("Lost")).toBeInTheDocument();
        expect(screen.getByText("Shreez")).toBeInTheDocument();
    });

    //TI 2 - La barre de recherche filtre les artistes
    it("filtre les artistes selon le terme de recherche", () => {
        // Arrange
        render(
            <AuthContext.Provider value={mockAuth}>
                <MemoryRouter>
                    <ArtisteList items={artistesMock} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //Act - taper "Enima" dans la barre de recherche
        const searchBar = screen.getByPlaceholderText("Rechercher un artiste...");
        fireEvent.change(searchBar, { target: { value: "Enima" } });

        //Assert - seulement Enima reste visible
        expect(screen.getByText("Enima")).toBeInTheDocument();
        expect(screen.queryByText("Lost")).not.toBeInTheDocument();
        expect(screen.queryByText("Shreez")).not.toBeInTheDocument();
    });
});
