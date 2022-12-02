import React, { useState } from 'react';

type AuthorSelectorProps = {
  onAuthorChange: (selectedAuthor: string) => void;
}

const AuthorSelector = (props: AuthorSelectorProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>();

  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(event.target.value);
    props.onAuthorChange(event.target.value);
  };

  return (
    <div>
      <select onChange={handleAuthorChange}>
        <option value="">Select an author...</option>
        <option value="DC Dennett">DC Dennett</option>
        <option value="Douglas R. Hofstadter">Douglas R. Hofstadter</option>
        <option value="Brian Cantwell Smith">Brian Cantwell Smith</option>
        <option value="Roger Penrose">Roger Penrose</option>
        <option value="Ruth Garrett Millikan">Ruth Garrett Millikan</option>
      </select>

      {selectedAuthor === 'DC Dennett' && (
        <div>
          <img src="/images/dc-dennett.jpg" alt="DC Dennett" />
          Author of <em>Consciousness Explained</em>.
        </div>
      )}
      {selectedAuthor === 'Douglas R. Hofstadter' && (
        <div>
          <img src="/images/douglas-hofstadter.jpg" alt="Douglas R. Hofstadter" />
          Author of <em>Gödel, Escher, Bach</em>.
        </div>
      )}
      {selectedAuthor === 'Brian Cantwell Smith' && (
        <div>
          <img src="/images/brian-cantwell-smith.jpg" alt="Brian Cantwell Smith" />
          Author of <em>On the Origin of Objects</em>.
        </div>
      )}
      {selectedAuthor === 'Roger Penrose' && (
        <div>
          <img src="/images/roger-penrose.jpg" alt="Roger Penrose" />
          Author of <em>The Emperor's New Mind</em>.
        </div>
      )}
      {selectedAuthor === 'Ruth Garrett Millikan' && (
        <div>
          <img src="/images/ruth-garrett-millikan.jpg" alt="Ruth Garrett Millikan" />
          Ruth Garrett Millikan is the author of <em>Language, Thought, and Other Biological Categories</em>.
        </div>
      )}
    </div>
  );
};

export default AuthorSelector;