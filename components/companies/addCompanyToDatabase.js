import { getDatabase, ref, push } from 'firebase/database';

const addCompanyToDatabase = async (companyName, companyDescription, companyCategory) => {
  try {
    // Opretter en reference til 'Companies' noden i databasen
    const companiesRef = ref(getDatabase(), 'Companies');

    // Tjekker om alle felter er udfyldt, ellers kastes en fejl
    if (!companyName || !companyDescription || !companyCategory) {
      throw new Error('All fields are required');
    }

    // Dataobjektet til den nye virksomhed
    const newCompanyData = {
      name: companyName,
      description: companyDescription,
      category: companyCategory,
    };

    // Bruger 'push' funktionen til at tilføje den nye virksomhed til databasen
    await push(companiesRef, newCompanyData);

    // Returnerer success true og en besked
    return { success: true, message: 'Company added successfully' };
  } catch (error) {
    // Returnerer success false og fejlmeddelelsen
    return { success: false, error: error.message };
  }
};

export default addCompanyToDatabase;
