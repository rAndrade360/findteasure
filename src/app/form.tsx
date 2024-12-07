
import "./globals.css";

interface FormProps {
  submitForm: (e: React.FormEvent<HTMLInputElement>) => Promise<void>;
  value: string;
  setValue: (name: string) => void;
}

export const Form: React.FC<FormProps> = (props) => {
  return (
      <form className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <input type="text" className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" value={props.value} onChange={(e) => props.setValue(e.target.value)} />
        <input type="submit" value="Enviar" onClick={props.submitForm} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
      </form>
  );
}
