"use client";

import { usePermissions } from "@/src/hooks/usePermissions";
import { UserRole } from "@/src/types/roles";

interface RoleBasedContentProps {
  module: string;
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleBasedContent({
  module,
  action,
  children,
  fallback = null,
}: RoleBasedContentProps) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(module, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RoleGateProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGate({ roles, children, fallback = null }: RoleGateProps) {
  const { getUserRole } = usePermissions();
  const userRole = getUserRole();

  if (!userRole || !roles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface ConditionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ConditionalRender({
  condition,
  children,
  fallback = null,
}: ConditionalRenderProps) {
  if (!condition) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
