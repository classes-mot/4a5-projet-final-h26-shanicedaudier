import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ArtisteCard from "./ArtisteCard";
import "@testing-library/jest-dom";

//Mock des sous-composants pour isoler ArtisteCard (test unitaire)
vi.mock("../artisteImage/ArtisteImage", () => ({
    default: ({ name }) => <img alt={name} src="fake.jpg" />,
}));

vi.mock("../UIElements/Card", () => ({
    default: ({ children }) => <div>{children}</div>,
}));

const mockAuthDeconnecte = {
    loggedIn: false,
    userId: null,
    login: vi.fn(),
    logout: vi.fn(),
};

const mockAuthConnecte = {
    loggedIn: true,
    userId: "u1",
    login: vi.fn(),
    logout: vi.fn(),
};

const artiste = {
    id: "a1",
    name: "Enima",
    category: "Rap",
    songPop: "À l'aise",
    description: "Un artiste montréalais.",
    image: "fake.jpg",
};

describe("Composant ArtisteCard", () => {

    //TU 1 - Affichage des informations de l'artiste
    it("affiche le nom, la catégorie et la chanson populaire de l'artiste", () => {
        render(
            <AuthContext.Provider value={mockAuthDeconnecte}>
                <MemoryRouter>
                    <ArtisteCard {...artiste} OnDelete={vi.fn()} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Assert
        expect(screen.getByText("Enima")).toBeInTheDocument();
        expect(screen.getByText(/Rap/)).toBeInTheDocument();
        expect(screen.getByText(/À l'aise/)).toBeInTheDocument();
    });

    //TU 2 - Boutons admin cachés pour le public
    it("ne affiche pas les boutons Modifier et Supprimer quand l'utilisateur est déconnecté", () => {
        render(
            <AuthContext.Provider value={mockAuthDeconnecte}>
                <MemoryRouter>
                    <ArtisteCard {...artiste} OnDelete={vi.fn()} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Assert
        expect(screen.queryByText("Modifier")).not.toBeInTheDocument();
        expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();
    });

    //TU 3 - Boutons admin visibles pour l'admin
    it("affiche les boutons Modifier et Supprimer quand l'utilisateur est connecté", () => {
        render(
            <AuthContext.Provider value={mockAuthConnecte}>
                <MemoryRouter>
                    <ArtisteCard {...artiste} OnDelete={vi.fn()} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Assert
        expect(screen.getByText("Modifier")).toBeInTheDocument();
        expect(screen.getByText("Supprimer")).toBeInTheDocument();
    });
});
