document.getElementById('scan-id').addEventListener('click', async () => {
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
        document.getElementById('chip-id').textContent = 'Chyba při čtení ID.';
      };
    } catch (error) {
      alert('Nepodařilo se spustit čtení ID: ' + error);
    }
  } else {
    alert('NFC není podporováno ve vašem prohlížeči.');
  }
});

document.getElementById('write-text').addEventListener('click', async () => {
  const text = prompt('Zadej text, který chceš zapsat do NDEF:');
  if (!text) return;

  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.write("Hello world!");
      document.getElementById('chip-id').textContent = 'Zápis proběhl úspěšně.';
    } catch (error) {
      alert('Chyba při zápisu: ' + error);
    }
  } else {
    alert('NFC zápis není podporován ve vašem prohlížeči.');
  }
});

document.getElementById('read-ndef').addEventListener('click', async () => {
  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      document.getElementById('chip-id').textContent = 'Čekám na čip...';

      ndef.onreading = event => {
        let output = `ID čipu: ${event.serialNumber || '(neznámé ID)'}`;
        for (const record of event.message.records) {
          if (record.recordType === "text") {
            const textDecoder = new TextDecoder(record.encoding || "utf-8");
            output += `\nText: ${textDecoder.decode(record.data)}`;
          }
        }
        document.getElementById('chip-id').textContent = output;
      };

      ndef.onreadingerror = () => {
        document.getElementById('chip-id').textContent = 'Chyba při čtení NDEF.';
      };
    } catch (error) {
      alert('Chyba při čtení NDEF: ' + error);
    }
  } else {
    alert('NFC není podporováno ve vašem prohlížeči.');
  }
});
