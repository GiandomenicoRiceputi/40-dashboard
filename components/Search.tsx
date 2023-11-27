// Allows to hide client side script from rendering on server
"use client";

// Importing required components and hooks
import { RotateCwIcon, SearchIcon } from "lucide-react";  // icons used in the search bar
import { usePathname, useRouter } from "next/navigation";  // hooks to get the current route and navigate programmatically
import { useTransition } from "react";  // hook to start or stop a transition

// Prop types for Search function
type Props = {
    query?: string;  // receive an optional string as props
};

const Search = ({ query }: Props) => {
    // Initialize router and pathname
    const router = useRouter();
    const pathname = usePathname();

    // Initialize transition
    const [isPending, startTransition] = useTransition();

    // Define function to handle search functionality
    function handleSearch(value: string) {
        const params = new URLSearchParams(window.location.search);

        // Update the URL parameters based on the search value
        if (value) {
            params.set("q", value);
        } else {
            params.delete("q");
        }

        // Replace the current route with an updated route including the new params
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }

    // Render the search bar
    return (
        <div className="relative mt-5 max-w-md">
            {/*...*/}
            <input
                type="text"
                name="search"
                id="search"
                autoComplete="off"
                className="h-10 block w-full rounded-md border border-gray-200 pl-9
        focus:border-indingo-500 focus:ring-indingo-500 sm:text-sm"
                placeholder="Search by name..."
                onChange={(event) => handleSearch(event.target.value)}  // handle the change event
                defaultValue={query}
            />
            {/* If transition is pending then show an animated icon */}
            {isPending && (
                <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
                    <RotateCwIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" />
                </div>
            )}
        </div>
    );
};

export default Search;