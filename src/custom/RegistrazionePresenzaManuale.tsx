// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("RegistrazionePresenzaManuale");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("RegistrazionePresenzaManuale");
import { useState } from "react";
import { Button, Card, Select, TextInput, useTable, usePrototype } from "../floware";

export default function RegistrazionePresenzaManuale(props) {__mk();
  const table = useTable(props.pageId);
  const attivita = useTable("attivita");
  const { notify } = usePrototype();
  const [scelta, setScelta] = useState("");
  const [nuova, setNuova] = useState("");
  const [campi, setCampi] = useState<Record<string, string>>({});
  if (!table || table.column("Attività") < 0) return <p>Colonna Attività non disponibile.</p>;
  const titoli = attivita && attivita.column("Titolo") >= 0 ? attivita.rows.map((r) => (__mk(), attivita.value(r, "Titolo"))) : [];
  const registrate = table.rows.map((r) => (__mk(), table.value(r, "Attività")));
  const disponibili = [...new Set([...titoli, ...registrate])].filter((v) => (__mk(), v.trim() && v !== "Inserimento manuale"));
  const nome = scelta === "Inserimento manuale" ? nuova.trim() : scelta;
  const altre = table.columns.filter((c) => (__mk(), c !== "Attività"));
  function cambiaCampo(colonna, valore) {__mk();
    setCampi((precedenti) => {__mk();
      const aggiornati = { ...precedenti };
      aggiornati[colonna] = valore;
      return aggiornati;
    });
  }
  function registra() {__mk();
    if (!nome) return;
    const valori: Record<string, string> = {};
    for (const colonna of table.columns) {__mk();
      valori[colonna] = colonna === "Attività" ? nome : campi[colonna] || "";
    }
    table.addRow(valori);
    setScelta("");
    setNuova("");
    setCampi({});
    notify("Presenza registrata con attività: " + nome);
  }
  return (
    <Card title="Registra presenza · attività esistente o manuale">
      <div className="space-y-4">
        <p className="text-(--mk-muted)">Usa questo riquadro in alternativa al form standard. Il nome manuale viene salvato nella colonna Attività. I dati restano in memoria.</p>
        <Select label="Attività" value={scelta} options={["", ...disponibili, "Inserimento manuale"]} onChange={setScelta} />
        {scelta === "Inserimento manuale" && <TextInput label="Nome nuova attività" value={nuova} onChange={setNuova} placeholder="Es. Laboratorio operativo" />}
        <div className="grid gap-4 md:grid-cols-2">
          {altre.map((colonna) => (__mk(), <TextInput key={colonna} label={colonna} value={campi[colonna] || ""} onChange={(valore) => (__mk(), cambiaCampo(colonna, valore))} />))}
        </div>
        <Button onClick={registra} disabled={!nome}>Registra presenza</Button>
      </div>
    </Card>
  );
}
