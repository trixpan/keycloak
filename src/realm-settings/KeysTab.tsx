import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, ButtonVariant, PageSection } from "@patternfly/react-core";
import type { KeyMetadataRepresentation } from "keycloak-admin/lib/defs/keyMetadataRepresentation";
import { ListEmptyState } from "../components/list-empty-state/ListEmptyState";
import { KeycloakDataTable } from "../components/table-toolbar/KeycloakDataTable";
import { useConfirmDialog } from "../components/confirm-dialog/ConfirmDialog";
import { emptyFormatter } from "../util";
import type ComponentRepresentation from "keycloak-admin/lib/defs/componentRepresentation";

import "./RealmSettingsSection.css";
import { cellWidth } from "@patternfly/react-table";

type KeyData = KeyMetadataRepresentation & {
  provider?: string;
};

type KeysTabInnerProps = {
  keys: KeyData[];
};

export const KeysTabInner = ({ keys }: KeysTabInnerProps) => {
  const { t } = useTranslation("roles");
  const history = useHistory();
  const { url } = useRouteMatch();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());

  const [publicKey, setPublicKey] = useState("");
  const [certificate, setCertificate] = useState("");

  const loader = async () => {
<<<<<<< HEAD
    return keys;
  };

  React.useEffect(() => {
    refresh();
  }, [keys]);

  const [togglePublicKeyDialog, PublicKeyDialog] = useConfirmDialog({
    titleKey: t("realm-settings:publicKeys").slice(0, -1),
    messageKey: publicKey,
    continueButtonLabel: "common:close",
    continueButtonVariant: ButtonVariant.primary,
    noCancelButton: true,
    onConfirm: async () => {},
  });

  const [toggleCertificateDialog, CertificateDialog] = useConfirmDialog({
    titleKey: t("realm-settings:certificate"),
    messageKey: certificate,
    continueButtonLabel: "common:close",
    continueButtonVariant: ButtonVariant.primary,
    noCancelButton: true,
    onConfirm: async () => {},
  });
=======

    const keysMetaData = allKeys;
    
    console.log("keyz", allKeys);

    return keysMetaData.map((key) => { 
            key.provider = realmComponents.find(
              (component) => component.id === key.providerId
            )?.name!;
          });
  };

    // let f = 
    // keys.map((key) => { 
    //     key.provider = realmComponents.find(
    //       (component) => component.id === key.providerId
    //     )?.name!;
    //   });

    //   console.log(typeof f)

  //   keys.forEach((item) => {
  //       if (item.name === "ecdsa-generated" )
  //       console.log(item.config!.ecdsaEllipticCurveKey[0].slice(-3))
  //     }
  //       )
  //   keys.config!.ecdsaEllipticCurveKey.slice(-2)

  const toggleModal = () => setOpen(!open);
>>>>>>> keys

  const goToCreate = () => history.push(`${url}/add-role`);

  const ProviderRenderer = ({ provider }: KeyData) => {
    return <>{provider}</>;
  };

<<<<<<< HEAD
  const ButtonRenderer = ({ provider, publicKey, certificate }: KeyData) => {
    if (provider === "ecdsa-generated") {
=======
};

  const ButtonRenderer = ({ name }: ComponentRepresentation) => {
    if (name === "ecdsa-generated") {
>>>>>>> keys
      return (
        <>
          <Button
            onClick={() => {
              togglePublicKeyDialog();
              setPublicKey(publicKey!);
            }}
            variant="secondary"
            id="kc-public-key"
          >
            {t("realm-settings:publicKeys").slice(0, -1)}
          </Button>
        </>
      );
    }
    if (provider === "rsa-generated" || provider === "fallback-RS256") {
      return (
        <>
          <Button
            onClick={() => {
              togglePublicKeyDialog();
              setPublicKey(publicKey!);
            }}
            variant="secondary"
            id="kc-rsa-public-key"
          >
            {t("realm-settings:publicKeys").slice(0, -1)}
          </Button>
          <Button
            onClick={() => {
              toggleCertificateDialog();
              setCertificate(certificate!);
            }}
            variant="secondary"
            id="kc-certificate"
          >
            {t("realm-settings:certificate")}
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <PageSection variant="light" padding={{ default: "noPadding" }}>
        <PublicKeyDialog />
        <CertificateDialog />
        <KeycloakDataTable
          key={key}
          loader={loader}
          ariaLabelKey="realm-settings:keysList"
          searchPlaceholderKey="realm-settings:searchKey"
          canSelectAll
          columns={[
            {
              name: "algorithm",
              displayKey: "realm-settings:algorithm",
              cellFormatters: [emptyFormatter()],
              transforms: [cellWidth(15)],
            },
            {
              name: "type",
              displayKey: "realm-settings:type",
              cellFormatters: [emptyFormatter()],
              transforms: [cellWidth(10)],
            },
            {
              name: "kid",
              displayKey: "realm-settings:kid",
              cellFormatters: [emptyFormatter()],
            },
            {
              name: "provider",
              displayKey: "realm-settings:provider",
              cellRenderer: ProviderRenderer,
              cellFormatters: [emptyFormatter()],
            },
            {
              name: "publicKeys",
              displayKey: "realm-settings:publicKeys",
              cellRenderer: ButtonRenderer,
              cellFormatters: [],
            },
          ]}
          emptyState={
            <ListEmptyState
              hasIcon={true}
              message={t("noRoles")}
              instructions={t("noRolesInstructions")}
              primaryActionText={t("createRole")}
              onPrimaryAction={goToCreate}
            />
          }
        />
      </PageSection>
    </>
  );
};

type KeysProps = {
  keys: KeyMetadataRepresentation[];
  realmComponents: ComponentRepresentation[];
};

export const KeysTab = ({ keys, realmComponents, ...props }: KeysProps) => {
  return (
    <KeysTabInner
      keys={keys?.map((key) => {
        const provider = realmComponents.find(
          (component: ComponentRepresentation) =>
            component.id === key.providerId
        );
        return { ...key, provider: provider?.providerId };
      })}
      {...props}
    />
  );
};
