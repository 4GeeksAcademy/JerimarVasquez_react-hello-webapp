const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            favorites: []
        },

        actions: {
            loadPeople: async () => {
                try {
                    const resp = await fetch("https://www.swapi.tech/api/people");
                    const data = await resp.json();
                    if (data?.results) {
                        setStore({ people: data.results });
                    }
                } catch (error) {
                    console.error("Error loading people:", error);
                }
            },

            loadPlanets: async () => {
                try {
                    const resp = await fetch("https://www.swapi.tech/api/planets");
                    const data = await resp.json();
                    if (data?.results) {
                        setStore({ planets: data.results });
                    }
                } catch (error) {
                    console.error("Error loading planets:", error);
                }
            },

            loadVehicles: async () => {
                try {
                    const resp = await fetch("https://www.swapi.tech/api/vehicles");
                    const data = await resp.json();
                    if (data?.results) {
                        setStore({ vehicles: data.results });
                    }
                } catch (error) {
                    console.error("Error loading vehicles:", error);
                }
            },

            addFavorite: (item) => {
                const store = getStore();
                if (
                    !store.favorites.find(
                        f => f.uid === item.uid && f.type === item.type
                    )
                ) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            removeFavorite: (uid, type) => {
                const store = getStore();
                setStore({
                    favorites: store.favorites.filter(
                        f => !(f.uid === uid && f.type === type)
                    )
                });
            }
        }
    };
};

export default getState;
