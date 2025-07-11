document.getElementById('scan').addEventListener('click', async () => {
  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      document.getElementById('chip-id').textContent = 'Přiložte čip...';

      ndef.onreading = event => {
        const id = event.serialNumber || '(neznámé ID)';
        document.getElementById('chip-id').textContent = `ID čipu: ${id}`;
      };

      ndef.onreadingerror = () => {
        document.getElementById('chip-id').textContent = 'Chyba při čtení.';
      };
    } catch (error) {
      alert('Nepodařilo se spustit čtení: ' + error);
    }
  } else {
    alert('NFC není podporováno ve vašem prohlížeči.');
  }
});