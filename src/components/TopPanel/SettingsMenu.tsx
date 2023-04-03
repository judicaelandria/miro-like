import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useApp } from "@tldraw/tldraw";
import { Fragment, useEffect } from "react";
import { track } from "signia-react";

export const SettingsMenu = track(() => {
  const app = useApp();
  const isDarkMode = app.userDocumentSettings.isDarkMode;
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);
  const menus = [
    {
      label: "Dark mode",
      checked: isDarkMode,
      action: () => {
        app.setDarkMode(!isDarkMode);
      },
    },
  ];
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-inherit py-2 text-sm">
          <Cog6ToothIcon className="w-6 text-slate-900 dark:text-white" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-max left-0 rounded bg-white dark:bg-dark-bg p-1">
          {menus.map(({ action, label, checked }, key) => (
            <Menu.Item key={key}>
              <button
                className="flex justify-between items-center gap-6 border-none text-black dark:text-white text-sm hover:bg-blue-500 hover:text-white rounded text-left py-2 px-1"
                onClick={action}
              >
                {label}
                {checked ? <CheckIcon className="w-4" /> : null}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
