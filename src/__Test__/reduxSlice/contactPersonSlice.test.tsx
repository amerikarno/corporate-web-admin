import contactPersonReducer, {
    addContactPerson,
    removeContactPerson,
    clearContactPersons,
    setContactPersons,
    updateContactPerson,
  } from '@/features/contactPersonSlice';
  import { TContactPerson } from '@/pages/createJob/addedCorporateAccount/constants2/types';
  import { TContact } from '@/pages/createJob/constant/type';
  
  describe('contactPersonSlice', () => {
    const initialState = {
      contactPersons: [] as TContactPerson[],
    };
  
    it('should handle initial state', () => {
      expect(contactPersonReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addContactPerson', () => {
      const newContact: TContactPerson = {
        personalId: '1',
        fullNames: [{ title: 'Mr.', firstName: 'John', lastName: 'Doe' }],
        position: 'Manager',
        division: 'Sales',
        telephone: '123-456-7890',
        email: 'john.doe@example.com',
      };
      const actual = contactPersonReducer(initialState, addContactPerson(newContact));
      expect(actual.contactPersons).toHaveLength(1);
      expect(actual.contactPersons[0]).toEqual(newContact);
    });
  
    it('should handle removeContactPerson', () => {
      const initial = {
        contactPersons: [
          { personalId: '1', fullNames: [{ title: 'Mr.', firstName: 'John', lastName: 'Doe' }], position: 'Manager', division: 'Sales', telephone: '123-456-7890', email: 'john.doe@example.com' },
          { personalId: '2', fullNames: [{ title: 'Ms.', firstName: 'Jane', lastName: 'Doe' }], position: 'Developer', division: 'IT', telephone: '987-654-3210', email: 'jane.doe@example.com' },
        ],
      };
      const actual = contactPersonReducer(initial, removeContactPerson('1'));
      expect(actual.contactPersons).toHaveLength(1);
      expect(actual.contactPersons[0]).toEqual({ personalId: '2', fullNames: [{ title: 'Ms.', firstName: 'Jane', lastName: 'Doe' }], position: 'Developer', division: 'IT', telephone: '987-654-3210', email: 'jane.doe@example.com' });
    });
  
    it('should handle clearContactPersons', () => {
      const initial = {
        contactPersons: [
          { personalId: '1', fullNames: [{ title: 'Mr.', firstName: 'John', lastName: 'Doe' }], position: 'Manager', division: 'Sales', telephone: '123-456-7890', email: 'john.doe@example.com' },
          { personalId: '2', fullNames: [{ title: 'Ms.', firstName: 'Jane', lastName: 'Doe' }], position: 'Developer', division: 'IT', telephone: '987-654-3210', email: 'jane.doe@example.com' },
        ],
      };
      const actual = contactPersonReducer(initial, clearContactPersons());
      expect(actual.contactPersons).toHaveLength(0);
    });
  
    it('should handle setContactPersons', () => {
      
const contacts: TContact[] = [
  {
    id: 'contact_1', // Add this line
    createBy: 'creator_1', // Add this line
    CreatedAt: '2023-01-01T00:00:00Z', // Add this line
    DeletedAt: null, // Add this line
    types: 1, // Add this line
    personalId: '1',
    fullNames: [
      {
        id: '1',
        createBy: 'user',
        CreatedAt: '2023-01-01',
        DeletedAt: null,
        contactID: '1',
        title: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        types: 1
      }
    ],
    corporateCode: 123,
    position: 'Manager',
    division: 'Sales',
    telephone: '123-456-7890',
    email: 'john.doe@example.com'
  },
  {
    id: 'contact_2', // Add this line
    createBy: 'creator_2', // Add this line
    CreatedAt: '2023-01-02T00:00:00Z', // Add this line
    DeletedAt: null, // Add this line
    types: 2, // Add this line
    personalId: '2',
    fullNames: [
      {
        id: '2',
        createBy: 'user',
        CreatedAt: '2023-01-02',
        DeletedAt: null,
        contactID: '2',
        title: 'Ms.',
        firstName: 'Jane',
        lastName: 'Doe',
        types: 2
      }
    ],
    corporateCode: 456,
    position: 'Developer',
    division: 'IT',
    telephone: '987-654-3210',
    email: 'jane.doe@example.com'
  }
];
      const actual = contactPersonReducer(initialState, setContactPersons(contacts));
      expect(actual.contactPersons).toHaveLength(2);
      expect(actual.contactPersons[0].corporateCode).toBe('123');
      expect(actual.contactPersons[1].corporateCode).toBe('456');
    });
  
    it('should handle updateContactPerson', () => {
      const initial = {
        contactPersons: [
          { personalId: '1', fullNames: [{ title: 'Mr.', firstName: 'John', lastName: 'Doe' }], position: 'Manager', division: 'Sales', telephone: '123-456-7890', email: 'john.doe@example.com' },
          { personalId: '2', fullNames: [{ title: 'Ms.', firstName: 'Jane', lastName: 'Doe' }], position: 'Developer', division: 'IT', telephone: '987-654-3210', email: 'jane.doe@example.com' },
        ],
      };
      const updatedContact: TContactPerson = {
        personalId: '3',
        fullNames: [{ title: 'Dr.', firstName: 'John', lastName: 'Smith' }],
        position: 'Lead',
        division: 'Engineering',
        telephone: '111-222-3333',
        email: 'john.smith@example.com',
      };
      const payload = { personalId: '1', newPersonalId: '3', contactPerson: updatedContact };
      const actual = contactPersonReducer(initial, updateContactPerson(payload));
      expect(actual.contactPersons).toHaveLength(2);
      expect(actual.contactPersons[0]).toEqual(updatedContact);
      expect(actual.contactPersons[0].personalId).toBe('3');
    });
  });