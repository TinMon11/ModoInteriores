/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WEB3FORMS_ACCESS_KEY } from './data';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Sends a submission to Web3Forms, which forwards it to the studio's inbox.
 * The access key is a public routing identifier (safe to expose in the
 * frontend), not a secret credential. Throws when the submission is rejected
 * so callers can surface an error to the user.
 */
export async function submitToWeb3Forms(fields: Record<string, unknown>): Promise<void> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      ...fields,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.message || 'No se pudo enviar el formulario.');
  }
}
