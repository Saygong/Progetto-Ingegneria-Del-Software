
const en = {
    listItem: {
        altImageText: "List item placeholder"
    },

    editPostingButton: {
        altImageText: "Edit image"
    },

    deletePostingButton: {
        titleDialog: "Are you sure to delete this posting?",
        text: "Delete",
        altImageText: "delete image"
    },

    toggleFavButton: {
        altImageText: "favourite image"
    },

    createPostingButton: {
        text: "Create new posting"
    },

    accessMarketplaceButton: {
        header: "Marketplace",
        title: "Family Market",
        description: "Access the marketplace"
    },

    searchBar: {
        altImageText: "Magnifying lens icon",
        placeholder: "Search",
        description: "What are you looking for?",
    },

    mailInput: {
        altImageText: "email image",
        placeholder: "youremail@yourdom.something",
        description: "E-Mail"
    },

    telephoneInput: {
        altImageText: "telephone image",
        placeholder: "Insert your phone number",
        description: "Telephone"
    },

    categoryComboBox: {
        altImageText: "Category icon",
        description: "Select the category:"
    },

    transactionTypeComboBox: {
        altImageText: "Transaction type icon",
        description: "Select the transaction type:"
    },

    confirmButton: {
        text: "Confirm"
    },

    profileButton: {
        altImageText: "profile icon"
    },

    postingsLists: {
        defaultTitle: "Newest posts",
        titleBuilder: (name, category, tnType) => {
            let title = "Results"

            if (name) {
                title += ` for '${name}'`;
            }

            if (category) {
                title += ` in '${category}'`;
            }

            if (tnType) {
                title += ` of type '${tnType}'`;
            }

            return title;
        }
    },

    editPostingScreen: {
        navBar: {
            title: {
                createMode: "Create new posting",
                editMode: "Edit posting"
            }
        },
        nameInput: {
            description: "Title",
            placeholder: "Insert title"
        },
        descriptionInput: {
            description: "Description",
            placeholder: "Insert description"
        },
        placeInput: {
            description: "Place: ",
            placeholder: "Insert the place"
        },
        editContactTitle: "Contact information:",
        missingValuesError: "Some values are missing!",
        editTitle: "Insert a title"
    },

    imageInput: {
        dropzoneText: "Drop an image for the posting here",
        altImageText: "Selected image"
    },

    marketplaceScreen: {
        title: "Family Market",
        postingList: "Newest Post",
        placeholder: "What are you looking for?"
    },

    favouritesScreen: {
        navBar: {
            title: "Saved posts"
        },
        noPostingsText: "You have no saved posts",
        title: "Your saved posts:"
    },

    myPostingsButton: {
        title: "My posts",
        description: "Postings divided by groups"
    },

    myFavouritesButton: {
        title: "Saved posts",
        description: "Post you liked"
    },

    postingInfo: {
        altImageText: "posting image placeholder"
    },

    myGroupsPostingsScreen: {
        prefix: "My posts in ",
        noPostingsText: "You have no postings in this group"
    },

    myGroupsWithPostingsScreen: {
        title : "My groups",
        instruction: "Select a group to see your postings"
    },

    postingInfoTabs: {
        desc: "Description:",
        product: "Product",
        where: "Where",
        contact: "Contacts",
        place: "Place:",
        user: "User:",
        phone: "Phone number:",
        mail: "Email:",
    },

    categoryDialog:{
        header: "Select the category:",
        save: "Save"
    },

    disclaimer:{
        title: "CONDIZIONI GENERALI DI UTILIZZO DI FAMILY-MARKET",
        text: "L'obbiettivo di Family-Market è quello di garantire condivisione di informazioni, contenuti ed oggetti materiali o immateriali." +
              "L'offerta proviene da un soggetto offerente privato e mira ad arrivare ad altri soggetti privati appartenenti ad una comunità." +
              "Nell'estensione possono essere proposti links di accesso a siti di altri enti o di società." +
              "Family-Market non può ritenersi responsabile circa la disponibilità, il contenuto," +
              "i prodotti ed i servizi offerti, nè, tanto meno, di eventuali danni o perdite occorsi in conseguenza dell' utilizzo.",
        error: "You must accept the general terms of use.",
        agree: "Accept"
    }
}


const it = {
    listItem: {
        altImageText: "Segnaposto elemento della lista"
    },

    editPostingButton: {
        altImageText: "Modifica immagine"
    },

    deletePostingButton: {
        titleDialog: "Sei sicuro di voler eliminare questo annuncio?",
        text: "Elimina",
        altImageText: "Elimina immagine"
    },

    toggleFavButton: {
        altImageText: "Immagine preferita"
    },

    createPostingButton: {
        text: "Crea un nuovo annuncio"
    },

    accessMarketplaceButton: {
        header: "Mercatino",
        title: "Family Market",
        description: "Accesso alla vetrina"
    },

    searchBar: {
        altImageText: "Icona lente di ingrandimento",
        placeholder: "Cerca",
        description: "Cosa stai cercando?",
    },

    mailInput: {
        altImageText: "Immagine email",
        placeholder: "mariorossi@esempio.qualcosa",
        description: "E-Mail"
    },

    telephoneInput: {
        altImageText: "Immagine telefono",
        placeholder: "Inserisci il tuo numero di telefono",
        description: "Telefono"
    },

    categoryComboBox: {
        altImageText: "Icona categoria",
        description: "Seleziona una categoria "
    },

    transactionTypeComboBox: {
        altImageText: "Icona tipo di transazione",
        description: "Seleziona il tipo di transazione "
    },

    confirmButton: {
        text: "Conferma"
    },

    profileButton: {
        altImageText: "Icona profilo"
    },

    postingsLists: {
        defaultTitle: "Nuovi annunci",
        titleBuilder: (name, category, tnType) => {
            let title = "Risultati"

            if (name) {
                title += ` per '${name}'`;
            }

            if (category) {
                title += ` in '${category}'`;
            }

            if (tnType) {
                title += ` di tipo '${tnType}'`;
            }

            return title;
        }
    },

    editPostingScreen: {
        navBar: {
            title: {
                createMode: "Crea un nuovo annuncio",
                editMode: "Modifica l'annuncio"
            }
        },
        nameInput: {
            description: "Titolo",
            placeholder: "Inserire titolo"
        },
        descriptionInput: {
            description: "Descrizione",
            placeholder: "Inserire descrizione"
        },
        placeInput: {
            description: "Luogo: ",
            placeholder: "Inserisci il luogo"
        },
        editContactTitle: "Informazioni di contatto:",
        missingValuesError: "Alcuni valori non sono stati inseriti!",
        editTitle: "Inserisci un titolo"
    },

    imageInput: {
        dropzoneText: "Premi qui per selezionare un' immagine per l'annuncio",
        altImageText: "Immagine selezionata"
    },

    marketplaceScreen: {

        title: "Family Market",
        postingList: "Nuovi annunci",
        placeholder: "Che cosa stai cercando?"
    },

    favouritesScreen: {
        navBar: {
            title: "Annunci salvati"
        },
        noPostingsText: "Non hai annunci salvati",
        title: "I tuoi post salvati:"
    },

    myPostingsButton: {
        title: "I miei annunci",
        description: "Annunci divisi per gruppo"
    },

    myFavouritesButton: {
        title: "Annunci salvati",
        description: "I post che ti sono piaciuti"
    },

    postingInfo: {
        altImageText: "Segnaposto immagine annuncio"
    },

    myGroupsPostingsScreen: {
        prefix: "I miei annunci in: ",
        noPostingsText: "Non hai annunci in questo gruppo"
    },

    myGroupsWithPostingsScreen: {
        title : "I miei gruppi",
        instruction: "Seleziona un gruppo per vedere i tuoi annunci"
    },

    postingInfoTabs: {
        desc: "Descrizione:",
        product: "Prodotto",
        where: "Dove",
        contact: "Contatti",
        place: "Luogo:",
        user: "Utente:",
        phone: "Cellulare:",
        mail: "Email:",
    },

    categoryDialog:{
        header: "Seleziona la categoria",
        save: "Salva"
    },

    disclaimer:{
        title: "CONDIZIONI GENERALI DI UTILIZZO DI FAMILY-MARKET",
        text:
            `L'obbiettivo di Family-Market è quello di garantire condivisione di informazioni, contenuti ed oggetti materiali o immateriali.
             L'offerta proviene da un soggetto offerente privato e mira ad arrivare ad altri soggetti privati appartenenti ad una comunità.
             Nell'estensione possono essere proposti links di accesso a siti di altri enti o di società.
             Family-Market non può ritenersi responsabile circa la disponibilità, il contenuto, i prodotti ed i servizi offerti, nè, tanto meno, di eventuali danni o perdite occorsi in conseguenza dell' utilizzo.`,
        error: "Accettare le condizioni generali di utilizzo.",
        agree: "Accetto"
    }

}






const el = {
    editPostingButton: {

    }
};

const nl = {
    editPostingButton: {

    }
};


const hu = {
    editPostingButton: {

    }
};

const fr = {
    editPostingButton: {

    }
};

const texts = { en, el, it, hu, nl, fr };

export default texts;

