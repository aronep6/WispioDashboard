import React from "react";
import { jest, describe, it, expect } from '@jest/globals';
import { render } from "@testing-library/react";
import { getAuth } from "firebase/auth";
import { act } from "react-dom/test-utils";
import { AuthenticationSessionProvider } from "./index";

jest.mock("firebase/auth");

const auth = getAuth();

describe("AuthenticationSessionProvider", () => {
    it("Renders children", () => {
        const { getByText } = render(
            <AuthenticationSessionProvider>
                <div>Test</div>
            </AuthenticationSessionProvider>
        );
        expect(getByText("Test")).toBeInTheDocument();
    });

    it("Sets user state when is correctly authenticated", async () => {
        const user = { uid: "123" };
        const onAuthStateChanged = jest.fn((cb: any) => cb(user));
        auth.onAuthStateChanged = onAuthStateChanged;

        let provider;
        await act(async () => {
            const { findByText } = render(
                <AuthenticationSessionProvider>
                    <div>Test</div>
                </AuthenticationSessionProvider>
            );
            provider = await findByText("Test");
        });

        expect(provider).toBeInTheDocument();
        expect(onAuthStateChanged).toHaveBeenCalled();
        expect(provider).toHaveAttribute("value", expect.stringContaining(user.uid));
    });

    it("Sets user state to null when the user is not authenticated", async () => {
        const onAuthStateChanged = jest.fn((cb) => cb(null));
        auth.onAuthStateChanged = onAuthStateChanged;

        let provider;
        await act(async () => {
            const { findByText } = render(
                <AuthenticationSessionProvider>
                    <div>Test</div>
                </AuthenticationSessionProvider>
            );
            provider = await findByText("Test");
        });

        expect(provider).toBeInTheDocument();
        expect(onAuthStateChanged).toHaveBeenCalled();
        expect(provider).toHaveAttribute("value", expect.stringContaining("null"));
    });
});