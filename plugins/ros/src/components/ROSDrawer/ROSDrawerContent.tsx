import React from 'react';
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { Scenario } from '../interface/interfaces';
import { Dropdown, MultiDropdown } from './Dropdown';
import { Textfield } from './Textfield';

const useDrawerContentStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));

export const useInputStyles = makeStyles((theme: Theme) => ({
  inputBox: {
    paddingTop: theme.spacing(2),
  },
  formLabel: {
    marginBottom: theme.spacing(1),
  },
}));

interface ROSDrawerContentProps {
  toggleDrawer: (isOpen: boolean) => void;
  nyttScenario: Scenario;
  setNyttScenario: (nyttScenario: Scenario) => void;
  lagreNyttScenario: () => void;
  slettNyttScenario: () => void;
}

// TODO: Hent data fra json schema

const trusselaktorer = [
  'Datasnok',
  'Hacktivist',
  'Uheldig ansatt',
  'Innside-aktør',
  'Organiserte kriminelle',
  'Terroristorganisasjon',
  'Nasjon/stat',
];

const sarbarheter = [
  'Kompromittert adminbruker',
  'Sårbarhet i avhengighet',
  'Lekket hemmelighet',
  'Feilkonfigurering',
  'Klussing med input',
  'Benekte brukerhandling',
  'Informasjonslekkasje',
  'Tjenestenekt',
  'Rettighetseskalering',
];

const nivaer = [1, 2, 3, 4, 5];

export const DrawerContent = ({
  toggleDrawer,
  nyttScenario,
  setNyttScenario,
  lagreNyttScenario,
  slettNyttScenario,
}: ROSDrawerContentProps) => {
  const { header, content, icon, buttons } = useDrawerContentStyles();

  const setBeskrivelse = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNyttScenario({
      ...nyttScenario,
      beskrivelse: event.target.value as string,
    });
  };

  const setTrusselaktorer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNyttScenario({
      ...nyttScenario,
      trusselaktorer: event.target.value as string[],
    });
  };

  const setSarbarheter = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNyttScenario({
      ...nyttScenario,
      sarbarheter: event.target.value as string[],
    });
  };

  const setSannsynlighet = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNyttScenario({
      ...nyttScenario,
      risiko: {
        ...nyttScenario.risiko,
        sannsynlighet: event.target.value as number,
      },
    });
  };

  const setKonsekvens = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNyttScenario({
      ...nyttScenario,
      risiko: {
        ...nyttScenario.risiko,
        konsekvens: event.target.value as number,
      },
    });
  };

  return (
    <>
      <Box className={header}>
        <Typography variant="h4">Nytt risikoscenario</Typography>
        <IconButton
          key="dismiss"
          title="Close the drawer"
          onClick={() => toggleDrawer(false)}
          color="inherit"
        >
          <Close className={icon} />
        </IconButton>
      </Box>

      <Box className={content}>
        <Textfield
          label="Beskrivelse"
          value={nyttScenario.beskrivelse}
          handleChange={setBeskrivelse}
        />

        <MultiDropdown
          label="Trusselaktører"
          selected={nyttScenario.trusselaktorer}
          options={trusselaktorer}
          handleChange={setTrusselaktorer}
        />

        <MultiDropdown
          label="Sårbarheter"
          selected={nyttScenario.sarbarheter}
          options={sarbarheter}
          handleChange={setSarbarheter}
        />

        <Dropdown
          label="Sannsynlighet"
          selected={nyttScenario.risiko.sannsynlighet}
          options={nivaer}
          handleChange={setSannsynlighet}
        />

        <Dropdown
          label="Konsekvens"
          selected={nyttScenario.risiko.konsekvens}
          options={nivaer}
          handleChange={setKonsekvens}
        />
      </Box>
      <Box className={buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => lagreNyttScenario()}
        >
          Lagre
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            slettNyttScenario();
            toggleDrawer(false);
          }}
        >
          Avbryt
        </Button>
      </Box>
    </>
  );
};
