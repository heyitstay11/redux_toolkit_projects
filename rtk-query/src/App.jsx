import { useState, useEffect } from 'react';
import { IcBaselineCalendarMonth, IcBaselineEmail, IcBaselineSettingsPhone, IcOutlineMapsHomeWork, IcRoundPassword, PhUserCircleFill } from './Icons';
import { useGetUsersQuery } from './services/users';

const App = () => {
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState('Random Person');
  const [title, setTitle] = useState('name');

  const { data, isLoading, refetch } = useGetUsersQuery();

  useEffect(() => {
    if(data){
      const randomPerson = data.results[0];
      const { phone,
              email,
              picture : { large : image }, 
              login : { password }, 
              name: { first, last },
              dob: { age },
              location : { street: { number, name} }
            } = randomPerson;

      const newPerson = {
        phone, 
        email, 
        image, 
        password,
        age,
        name: `${first} ${last}`, 
        street : `${number} ${name}`
      };
      setPerson(() => newPerson);
      setTitle('Name');
      setValue(newPerson?.name);
    }
  }, [data]);

  const handleValue = (e) => {
    const label = e.target.dataset.labels;
    if(!label) return;
    setTitle(label);
    setValue(person[label]);
  }

  return (
   <main className=''>
     <div className="block bcg-black"></div>
       <div className="container">
         {person && <img src={ person.image } alt="" />}
          <p className="user-title">My {title}</p>
          <p className="user-value">{value}</p>
          <div className="values-list">

            <button data-labels='name' onMouseOver={handleValue} className="icon">
              <PhUserCircleFill />
            </button>
            
            <button data-labels='email' onMouseOver={handleValue} className="icon">
              <IcBaselineEmail />
            </button>

            <button data-labels='age' onMouseOver={handleValue} className="icon">
              <IcBaselineCalendarMonth />
            </button>

            <button data-labels='street' onMouseOver={handleValue} className="icon">
              <IcOutlineMapsHomeWork />
            </button>

            <button data-labels='age' onMouseOver={handleValue} className="icon">
              <IcBaselineCalendarMonth />
            </button>

            <button data-labels='password' onMouseOver={handleValue} className="icon">
              <IcRoundPassword />
            </button>
          </div>

          <button className="btn" onClick={() => refetch()}>
            {isLoading ? 'loading ...': 'Random User'}
          </button>
       </div>
   </main>
  )
}

export default App;