import { useState } from 'react';
import { isAddress } from 'viem';

import { END_ADDRESS } from '@/constants';
import { dumpSafe } from '@/utils/dump';
import { asError } from '@/utils/exceptions';
import manifest from '@/public/manifest.json';

import css from './styles.module.css';

const enum Fields {
  Dumpee = 'dumpee',
}

export function SafeDump(): React.ReactElement {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    const formData = new FormData(event.currentTarget);
    const dumpee = formData.get(Fields.Dumpee) as string;

    if (!isAddress(dumpee)) {
      setError('Dumpee is not a valid address');
      return;
    }

    try {
      await dumpSafe(dumpee);
    } catch (error) {
      setError(asError(error).message);
    }
  };

  return (
    <main>
      <h1>{manifest.name}</h1>

      <h3>{manifest.description}</h3>

      <p>
        Dumping a Safe transfers ownership to a dumpee. The default dumpee is{' '}
        <code>{END_ADDRESS}</code>. Dumping to this address is{' '}
        <b>irreversible</b>!
      </p>

      <form className={css.form} onSubmit={onSubmit}>
        <label htmlFor={Fields.Dumpee}>Dumpee:</label>
        <input
          name={Fields.Dumpee}
          // Safe does not allow zero or sentinel address as owner
          defaultValue={END_ADDRESS}
        />

        <button type='submit' className={css.submit}>
          Dump
        </button>

        {error ? <pre className={css.error}>{error}</pre> : null}
      </form>
    </main>
  );
}
