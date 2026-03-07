"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, Plus, Wallet } from "lucide-react";
import useBinanceAddresses, { BinanceAddress } from "./useBinanceAddresses";

export default function BinanceAddressSetting() {
  const {
    addresses,
    activeId,
    isLoading,
    addAddress,
    deleteAddress,
    setActiveAddress,
    isAdding,
    isDeleting,
    isSettingActive,
  } = useBinanceAddresses();

  const [newAddress, setNewAddress] = useState({ name: "", address: "" });
  const [showForm, setShowForm] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.name.trim() || !newAddress.address.trim()) return;

    await addAddress(newAddress);
    setNewAddress({ name: "", address: "" });
    setShowForm(false);
  };

  const handleSetActive = (id: string) => {
    setActiveAddress(id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      await deleteAddress(id);
    }
  };

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Binance Wallet Addresses
        </CardTitle>
        <CardDescription>
          Manage multiple Binance wallet addresses. Select one as active for deposits.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address List */}
        {isLoading ? (
          <div className="text-muted-foreground">Loading addresses...</div>
        ) : addresses.length === 0 ? (
          <div className="text-muted-foreground text-center py-4">
            No addresses added yet.
          </div>
        ) : (
          <RadioGroup
            value={activeId || ""}
            onValueChange={handleSetActive}
            className="space-y-3"
          >
            {addresses.map((addr: BinanceAddress) => (
              <div
                key={addr._id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  activeId === addr._id
                    ? "border-primary bg-primary/5 neon-glow"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <RadioGroupItem
                    value={addr._id}
                    id={addr._id}
                    disabled={isSettingActive}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <Label
                      htmlFor={addr._id}
                      className="font-medium cursor-pointer block"
                    >
                      {addr.name}
                      {activeId === addr._id && (
                        <span className="ml-2 text-xs text-primary">(Active)</span>
                      )}
                    </Label>
                    <p className="text-sm text-muted-foreground font-mono truncate mt-1">
                      {addr.address}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(addr._id)}
                  disabled={isDeleting}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </RadioGroup>
        )}

        {/* Add New Address Form */}
        {showForm ? (
          <form onSubmit={handleAdd} className="space-y-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
            <div className="space-y-2">
              <Label htmlFor="address-name">Wallet Name</Label>
              <Input
                id="address-name"
                placeholder="e.g., Main Wallet, Backup Wallet"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, name: e.target.value }))
                }
                className="neon-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Binance Address</Label>
              <Input
                id="wallet-address"
                placeholder="Enter Binance wallet address"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress((prev) => ({ ...prev, address: e.target.value }))
                }
                className="neon-border font-mono"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isAdding}
                className="neon-glow"
              >
                {isAdding ? "Adding..." : "Add Address"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setNewAddress({ name: "", address: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowForm(true)}
            className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5 hover:text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
